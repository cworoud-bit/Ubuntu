Vagrant.configure("2") do |config|
  config.vm.define "ubuntu-vagrant" do |node|
    node.vm.provider "docker" do |d|
      d.image = "rastasheep/ubuntu-sshd:18.04"
      d.has_ssh = true
    end
    node.ssh.username = "root"
    node.ssh.password = "root"
    node.ssh.insert_key = false
  end
end
