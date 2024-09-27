const Minio = require('minio');

// Configuration du client MinIO
const minioClient = new Minio.Client({
  endPoint: 'localhost', // ou l'URL de votre serveur MinIO
  port: 9000, // Port par défaut de MinIO
  useSSL: false, // Si SSL est activé ou non
  accessKey: 'minioadmin', // Votre access key
  secretKey: 'minioadmin' // Votre secret key
});

// Créer un bucket si nécessaire
const bucketName = 'images';
minioClient.bucketExists(bucketName, (err, exists) => {
  if (err) {
    return console.log(err);
  }
  if (!exists) {
    minioClient.makeBucket(bucketName, 'us-east-1', (err) => {
      if (err) return console.log('Erreur de création du bucket:', err);
      console.log(`Bucket ${bucketName} créé avec succès.`);
    });
  }
});

module.exports = minioClient;
