import moment from 'moment';

const getDurationInMinutes = (lockedAt: Date) => {
  const ms = moment(
    moment(Date.now()).format('DD/MM/YYYY HH:mm:ss'),
    'DD/MM/YYYY HH:mm:ss',
  ).diff(
    moment(
      moment(lockedAt).format('DD/MM/YYYY HH:mm:ss'),
      'DD/MM/YYYY HH:mm:ss',
    ),
  );
  const duration = moment.duration(ms);
  const minutes = duration.asMinutes();
  return minutes ? minutes : null;
};

const validateIfEmailCanBeSent = (
  expirationTime: Date,
  codeTimeToLiveInHours,
): boolean => {
  const generationTime = moment(expirationTime).subtract(
    codeTimeToLiveInHours,
    'hour',
  );
  return !!(expirationTime && moment().diff(generationTime, 'seconds') < 10);
};
