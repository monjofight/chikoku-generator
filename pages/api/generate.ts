import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const Generate = async (req: NextApiRequest, res: NextApiResponse) => {
  const { target, action, destination, length, breakLine } = req.query;

  const prompt = `遅刻の理由を生成アシスタントです。入力で与えられた情報を元に遅刻理由適当に生成します。

以下の指示に従って生成してください。
・文章の長さ: ${length}文字
・改行: ${breakLine === "true" ? "あり" : "なし"}

送信相手
・${destination == "その他" ? "誰か" : destination}

入力
・${target}が${action}

遅刻理由は以下です。`;

  console.log(prompt);

  const model = "gpt-3.5-turbo-0301";
  const response = await openai.createChatCompletion({
    model: model,
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.data.choices[0].message?.content;
  res.status(200).json({ message: content });
};

export default Generate;
