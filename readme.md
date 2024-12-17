Un site qui concerne comme un gallery de jeux vidéo en utilisant nodejs , express , prisma , nodemon , hbs . Ce projet utiliser méthod MVC 

MVC DOC : https://docs.phalcon.io/4.1/mvc/

Les outils à installer : 
nodejs 

ouvre votre terminal 

configurer npm : npm init

install express : npm install express 

nodemon : npm install --save-dev

prisma :npm install prisma @prisma/client sqlite3

npx prisma init

modifier db : npx prisma migrate dev --name init

create client : npx prisma generate

hbs : npm install hbs 

apres tous avoir installé . allez-vous au file package.json et voir s'il exist ["start": "nodemon src/main.js"] dans le script , si non ajoutez-le . donc maintenant vous mettez npm start pour debug .




