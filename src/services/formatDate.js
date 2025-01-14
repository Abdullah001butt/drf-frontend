export function FormatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }).replace(' ', '')
}