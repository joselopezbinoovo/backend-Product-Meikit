# Usa una imagen oficial de Node.js
FROM node:14.15.0-alpine

# Crea y establece el directorio de trabajo
WORKDIR /home/node/backend-product-meikit
# Copia el archivo package.json y package-lock.json (si existen)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto 3000
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "start"]
