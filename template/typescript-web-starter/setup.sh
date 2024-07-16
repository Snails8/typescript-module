################################################
# yarn v4 でtypescriptのプロジェクト雛形を作成するshell
# yarn/ node_module / typescriprt / server / lisnter / prettier / test 
################################################
yarn init -y
echo "nodeLinker: node-modules" >> .yarnrc

yarn add typescript @types/node ts-node nodemon rimraf

npx tsc --init 

# server
yarn add express @types/express
yarn add -D @types/express

# 