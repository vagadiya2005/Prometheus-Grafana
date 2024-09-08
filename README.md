Install Garfana manually on Ubuntu:

sudo apt-get update

sudo apt-get install -y software-properties-common apt-transport-https

sudo wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -

sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"

sudo apt-get update

sudo apt-get install -y grafana

sudo systemctl start grafana-server
sudo systemctl enable grafana-server

sudo systemctl status grafana-server
