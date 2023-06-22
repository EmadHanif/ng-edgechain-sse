
export class MessageModel {
  id: number;
  message: string;

  constructor(jsonData) {
    Object.assign(this, jsonData);
  }
}
