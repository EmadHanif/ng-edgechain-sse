
export class ChainResponseModel {

  response: string;

  constructor(jsonText) {
    Object.assign(this, jsonText);
  }
}
