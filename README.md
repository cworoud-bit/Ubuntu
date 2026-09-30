# Projet DevOps — Ubuntu Server, SSH, Docker, Jenkins & CV en ligne

Ce projet documente la mise en place d'un environnement Linux sécurisé
(VM Ubuntu Server 26.04), l'installation de services (Docker, Jenkins),
ainsi que la création et la publication d'un mini CV avec Git/GitHub.

---

## 1. Installation d'Ubuntu Server 26.04

Installation réalisée sur VMware Workstation avec :
- Serveur OpenSSH installé pendant l'installation (option "Install OpenSSH server")
- Partitionnement LVM par défaut

---

## 2. Configuration de l'accès SSH sécurisé

### Étapes réalisées

1. Génération d'une paire de clés SSH sur la machine physique (Windows) :
   ```powershell
   ssh-keygen -t ed25519
   ```

2. Copie de la clé publique vers la VM :
   ```powershell
   type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh wrida@192.168.220.174 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
   ```

3. Durcissement de la configuration SSH (`/etc/ssh/sshd_config`) :
   ```
   PasswordAuthentication no
   PubkeyAuthentication yes
   ```
   ```bash
   sudo systemctl restart ssh
   ```

### Test de connexion depuis la machine physique
```powershell
ssh wrida@192.168.220.174
```

### Résultat
Connexion établie uniquement par authentification par clé publique/privée.
L'authentification par mot de passe est désactivée, empêchant toute
tentative de connexion par force brute.

### Captures d'écran
![Connexion SSH par clé sans mot de passe](screenshots/ssh-cle-sans-motdepasse.png)
![Configuration sshd_config sécurisée](screenshots/sshd-config-securise.png)

---

## 3. Installation de Docker

### Étapes réalisées
```bash
sudo apt update
sudo apt install ca-certificates curl gnupg -y
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y
sudo usermod -aG docker $USER
```

### Vérification
```bash
docker --version
sudo systemctl status docker
sudo docker run hello-world
```

### Résultat
- Docker version 29.8.1
- Service actif (`active (running)`) et activé au démarrage (`enabled`)
- Message "Hello from Docker!" confirmant le bon fonctionnement

### Captures d'écran
![Statut du service Docker](screenshots/docker-status.png)
![Test hello-world](screenshots/docker-hello-world.png)

---

## 4. Installation de Jenkins en tant que service

### Étapes réalisées
```bash
# Java (prérequis)
sudo apt install openjdk-21-jre -y

# Clé GPG Jenkins (clé 2026, mise à jour officielle)
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null

# Dépôt Jenkins
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list

sudo apt update
sudo apt install jenkins -y

# Service
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Pare-feu
sudo ufw allow 8080/tcp
```

### Vérification du service
```bash
sudo systemctl status jenkins
```
Résultat : service actif (`active (running)`) et activé au démarrage.

### Vérification depuis la machine physique
Accès via navigateur à l'adresse : `http://192.168.220.174:8080`

Jenkins version 2.580.1 accessible et fonctionnel, avec le dashboard
"Bienvenue sur Jenkins !" confirmant une installation complète et réussie.

### Captures d'écran
![Statut du service Jenkins](screenshots/jenkins-status.png)
![Page de déblocage Jenkins](screenshots/jenkins-unlock.png)
![Dashboard Jenkins fonctionnel](screenshots/jenkins-dashboard.png)

---

## 5. Mini CV One Page (HTML5/CSS3/JavaScript)

Un CV personnel sur une seule page, en fichier HTML autonome (CSS et
JavaScript intégrés dans le même fichier), avec un thème inspiré du
terminal (cohérent avec le contenu du projet : Linux, Docker, Jenkins, SSH).

### Lien GitHub
🔗 https://github.com/cworoud-bit/Ubuntu

### Lien GitHub Pages (site en ligne)
🔗 https://cworoud-bit.github.io/Ubuntu/

### Capture d'écran
![CV en ligne](screenshots/cv-preview.png)

---

## 6. Activation des push GitHub via SSH

### Étapes réalisées

1. Génération d'une clé SSH sur la VM (dédiée à GitHub) :
   ```bash
   ssh-keygen -t ed25519 -C "Cworoud@gmail.com"
   ```

2. Affichage et copie de la clé publique :
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

3. Ajout de la clé sur GitHub :
   - GitHub → Settings → SSH and GPG keys → New SSH key
   - Nom : `VM ubuntu`
   - Collage de la clé publique → Add SSH key

4. Test de la connexion SSH :
   ```bash
   ssh -T git@github.com
   ```
   Résultat :
   ```
   Hi cworoud-bit! You've successfully authenticated, but GitHub does not provide shell access.
   ```

5. Configuration du dépôt local pour utiliser SSH :
   ```bash
   git remote set-url origin git@github.com:cworoud-bit/Ubuntu.git
   ```

6. Push réussi :
   ```bash
   git add .
   git commit -m "CV en fichier HTML unique autonome"
   git push -u origin main
   ```

### Captures d'écran
![Clé SSH ajoutée sur GitHub](screenshots/github-ssh-key.png)
![Test SSH réussi](screenshots/ssh-test-github.png)
![Push réussi vers GitHub](screenshots/git-push-success.png)

---

## Résumé du projet

| # | Tâche | Statut |
|---|---|---|
| 1 | Ubuntu Server 26.04 installé | ✅ |
| 2 | SSH sécurisé (clé + mot de passe désactivé) | ✅ |
| 3 | Docker installé et testé | ✅ |
| 4 | Jenkins installé et accessible | ✅ |
| 5 | Mini CV (HTML/CSS/JS) publié sur GitHub | ✅ |
| 6 | Push GitHub via SSH configuré et testé | ✅ |

## Environnement technique
- **Hyperviseur** : VMware Workstation
- **OS invité** : Ubuntu Server 26.04 LTS
- **Machine physique** : Windows (PowerShell / CMD)
- **Adresse IP de la VM** : `192.168.220.174`
