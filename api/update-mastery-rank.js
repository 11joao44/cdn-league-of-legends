import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.resolve('./mastery-rank.json'); // Caminho para o arquivo na raiz
  console.log('Requisição recebida:', req.method, req.body);

  if (req.method === 'POST') {
    try {
      // Lê o arquivo existente
      let existingData = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        existingData = JSON.parse(fileContent);
      }

      const newEntry = req.body;
      console.log('Dados recebidos para atualização:', newEntry);

      // Atualiza ou adiciona o jogador
      const updatedData = existingData.filter((entry) => entry.summonerName !== newEntry.summonerName);
      updatedData.push(newEntry);

      // Salva o arquivo atualizado
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
      console.log('JSON atualizado com sucesso.');

      res.status(200).json({ message: 'Dados atualizados com sucesso.' });
    } catch (error) {
      console.error('Erro ao atualizar o JSON:', error);
      res.status(500).json({ error: 'Erro ao atualizar dados.' });
    }
  } else {
    console.log('Método não permitido:', req.method);
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
