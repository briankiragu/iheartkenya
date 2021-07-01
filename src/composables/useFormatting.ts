export default () => {
  // Convert a word/phrase to 'Title Case'.
  const toTitle = (value: string = ''): string => value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return { toTitle }
}