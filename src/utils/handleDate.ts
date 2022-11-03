export function formatDate(dateString: string) {
    return dateString.split('T')[0].replace(/-/gi, '/');
}
