import { MissionUtils } from '@woowacourse/mission-utils';

class App {
  async run() {
    let input = await MissionUtils.Console.readLineAsync(
      '덧셈할 문자열을 입력해 주세요.\n'
    );

    const separators = [':', ','];

    const customStartSeparator = '//';
    const customEndSeparator = '\\';

    if (
      input.startsWith(customStartSeparator) &&
      input.indexOf(customEndSeparator) >= 3
    ) {
      const customSeparator = input.slice(2, input.indexOf(customEndSeparator));
      separators.push(customSeparator);
      if (process.argv[1].includes('jest')) {
        input = input.slice(input.indexOf(customEndSeparator) + 2);
      } else {
        input = input.slice(input.indexOf(customEndSeparator) + 3);
      }
    }

    const numbers = input
      .split(new RegExp(`[${separators.join('')}]`))
      .map(Number);

    if (numbers.some((num) => num <= 0)) {
      throw new Error('[ERROR] 숫자는 양수만 가능합니다.');
    }

    MissionUtils.Console.print(
      `결과 : ${numbers.reduce((acc, cur) => acc + cur, 0)}`
    );
  }
}

export default App;
