import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.resolve('./public/mastery-rank.json');

  if (req.method === 'POST') {
    try {
      const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8')) || [];
      const newEntry = req.body;

      // Atualiza ou adiciona o novo dado
      const updatedData = existingData.filter((entry) => entry.summonerName !== newEntry.summonerName);
      updatedData.push(newEntry);

      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

      res.status(200).json({ message: 'Dados atualizados com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar dados.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
