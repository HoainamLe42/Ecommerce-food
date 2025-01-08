const CURRENCY_FORMATTER = new Intl.NumberFormat('vi-VN', {
    currency: 'VND',
    style: 'currency',
});

export const formatCurrency = (number: number): string => {
    return CURRENCY_FORMATTER.format(number);
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};
