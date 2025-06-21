import { Injectable } from '@nestjs/common';
import { badWordsList } from '../core/constant/bad-words';

@Injectable()
export class ProfanityFilterService {
  private readonly badWords: Set<string>;

  constructor() {
    this.badWords = new Set(badWordsList.map((word) => word.toLowerCase()));
  }

  filterText(text: string): string {
    return text
      .split(/\b/)
      .map((word) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
        return this.badWords.has(cleanWord.toLowerCase())
          ? '*'.repeat(cleanWord.length)
          : word;
      })
      .join('');
  }
}
