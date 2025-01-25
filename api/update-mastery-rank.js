import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.resolve('./mastery-rank.json'); // Caminho para o arquivo JSON na raiz
  console.log('Método da requisição:', req.method);

  if (req.method === 'POST') {
    try {
      console.log('Dados recebidos:', req.body);

      // Ler o JSON existente
      let existingData = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        console.log('Conteúdo atual do JSON:', fileContent);
        existingData = JSON.parse(fileContent);
      }

      // Atualizar ou adicionar dados
      const newEntry = req.body;
      const updatedData = existingData.filter((entry) => entry.summonerName !== newEntry.summonerName);
      updatedData.push(newEntry);

      // Escrever no arquivo JSON
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
      console.log('Arquivo JSON atualizado com sucesso.');

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
