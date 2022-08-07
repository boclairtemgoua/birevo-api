import { ApplicationToken } from '../../../models/ApplicationToken';

export type GetCurrenciesSelections = {
  filterQuery?: any;
};

export type GetOneApplicationTokenSelections = {
  option1?: {
    application_Token_uuid: ApplicationToken['uuid'];
  };
  option2?: {
    token: ApplicationToken['token'];
  };
};

export type UpdateApplicationTokenSelections = {
  option1?: {
    application_token_uuid: ApplicationToken['uuid'];
  };
};

export type CreateApplicationTokenOptions = Partial<ApplicationToken>;

export type UpdateApplicationTokenOptions = Partial<ApplicationToken>;
