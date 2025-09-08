import { JackpotInterface } from './jackpot.interface';
import { ReportInterface } from './report.interface';

export interface JackpotResolveInterface {
  result: JackpotInterface[];
  report: ReportInterface;
}
