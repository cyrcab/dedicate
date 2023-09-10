const formatDateForReadIt = (dateToTransform) => {
  if (!dateToTransform) throw new Error('A parameter is needed');

  const valueAsDateFormat = new Date(dateToTransform);

  return valueAsDateFormat.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default formatDateForReadIt;
