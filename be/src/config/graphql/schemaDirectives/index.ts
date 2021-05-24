import {createRateLimitDirective} from 'graphql-rate-limit';
import AuthDirective from './auth';
import ConcatDirective from './concat';
import DateFormatDirective from './date';
import DeprecatedDirective from './deprecated';
import IntlDirective from './intl';
import PathDirective from './path';
import PermissionDirective from './permission';
import RestDirective from './rest';
import UpperCaseDirective from './upper';
import ValidateDirective from './validate';

export default {
  isAuthenticated: AuthDirective,
  hasPermission: PermissionDirective,
  hasPath: PathDirective,
  deprecated: DeprecatedDirective,
  rateLimit: createRateLimitDirective({
    identifyContext: ctx => (ctx.currentUser ? ctx.currentUser._id : '')
  }),
  date: DateFormatDirective,
  upper: UpperCaseDirective,
  concat: ConcatDirective,
  intl: IntlDirective,
  rest: RestDirective,
  validate: ValidateDirective
};
