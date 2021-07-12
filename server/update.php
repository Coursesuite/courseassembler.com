<?php
/*

just tinkering with an auto-self-update script

also look at

https://github.com/vicenteguerra/git-deploy

create a private/public key pair, without passphrase.
The public key gets added in GitHub as a "deploy key" while the private key gets saved as /var/www/.ssh/id_rsa.
I also did sudo touch /var/www/.ssh/known_hosts && sudo chmod www-data /var/www/.ssh/known_hosts,
then ran sudo -u www-data git pull from the command line to update the known_hosts file.

sudo chown www-data /var/www/.ssh/known_hosts.

etc/suoders:

www-data ALL = (myuser) NOPASSWD: /usr/bin/git
www-data ALL = (myuser) NOPASSWD: /usr/bin/node
www-data ALL = (myuser) NOPASSWD: /usr/bin/drush
www-data ALL = (myuser) NOPASSWD: /usr/bin/whoami

git reset --hard HEAD will delete everything. Put such files and folders in your .gitignore.

also, as usually shell_exec is run from the user www-data I had to change permissions by executing the following command inside /var/www/html

sudo chown www-data:www-data -R my-repo/

*/
$secret = "01204835-c593-408f-98ce-f76b65f3577b";
$path = realpath(".");
$branch = "master";
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE'];
if ($signature) {
  $hash = "sha1=".hash_hmac('sha1', file_get_contents("php://input"), $secret);
  if (strcmp($signature, $hash) == 0) {
    echo shell_exec("cd {$path} && /usr/bin/git reset --hard origin/{$branch} && /usr/bin/git clean -f && /usr/bin/git pull 2>&1 && composer update --no-dev");
    exit();
  }
}
http_response_code(404);
?>