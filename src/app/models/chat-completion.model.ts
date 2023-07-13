
export class  Message {
  role: string;
  content: string;
}

export class Choice {
  index: number;
  message: Message;
  finish_reason: string;
}

export class Usage {
  prompt_tokens: number;
  total_tokens: number;
}

export class ChatCompletionModel {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;

  constructor(jsonText) {
    Object.assign(this, jsonText);
  }
}
