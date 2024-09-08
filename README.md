Install Garfana manually on Ubuntu:

sudo apt-get update

#Install packages that are needed to add external repositories
sudo apt-get install -y software-properties-common apt-transport-https

#This step ensures that the Grafana package is trusted by your system
sudo wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -

#Add the official Grafana repository to your system.
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"

#After adding the new repository, update the package list to include Grafana packages
sudo apt-get update

#Now install the Grafana package using APT.
sudo apt-get install -y grafana

#After installation, start the Grafana service and enable it to start on boot.
sudo systemctl start grafana-server
sudo systemctl enable grafana-server

#You can check if Grafana is running by using the following command.
sudo systemctl status grafana-server
