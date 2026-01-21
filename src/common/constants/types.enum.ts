export enum Environment {
  development = 'development',
  staging = 'staging',
  production = 'production',
}

export enum UnitStatus {
  VACANT = 'VACANT',
  OCCUPIED = 'OCCUPIED',
  BOOKED = 'BOOKED',
}

export enum OutBoxState {
  REGISTERED = 'REGISTERED',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED',
}

export enum OutBoxTopics {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PAYMENTS = 'PAYMENTS',
}

export enum AggregateType {
  PAYMENTS = 'PAYMENTS',
  COMMUNICATION = 'COMMUNICATION',
}
