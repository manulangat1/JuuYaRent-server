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

export enum Type {
  Tenant = 'normal',
  ADMIN = 'super',
  Agent = 'agent',
}

export enum AdminPermissions {
  VIEW_TENANTS = 'VIEW_TENANTS',
}
export enum AgentStatus {
  REGISTERED = 'REGISTERED',
  EMAIL_VALIDATED = 'EMAIL_VALIDATED',
  BLACK_LISTED = 'BLACK_LISTED',
  DELETED = 'DELETED',
}
