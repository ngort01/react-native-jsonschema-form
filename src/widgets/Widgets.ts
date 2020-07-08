import TextWidget from './TextWidget';
import TextareaWidget from './TextareaWidget';
import CheckboxWidget from './CheckboxWidget';
import CheckboxesWidget from './CheckboxesWidget';
import PasswordWidget from './PasswordWidget';
import RadioWidget from './RadioWidget';
import RangeWidget from './RangeWidget';
import SignatureWidget from './SignatureWidget/SignatureWidget';

export const Widgets = {
  TextWidget,
  TextareaWidget,
  CheckboxWidget,
  CheckboxesWidget,
  PasswordWidget,
  RadioWidget,
  SelectWidget: RadioWidget,
  RangeWidget,
  signature: SignatureWidget,
};
