export const capitalizer = (item) => {
    return item
    .split(' ') // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter and convert the rest to lowercase
    .join(' '); // Join the words back into a single string
}

export const dateFormatter = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
};

export const groupTransactionsByDate = (transactionHistory) => {
    return transactionHistory.reduce((acc, transaction) => {
        const date = dateFormatter(transaction.transaction_date);
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
    }, {});
};

export const getDateLabel = (transactionDateStr) => {
    const transactionDate = new Date(transactionDateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Check if the transaction date is today
    if (transactionDate.toDateString() === today.toDateString()) {
        return "Today";
    }

    // Check if the transaction date is yesterday
    if (transactionDate.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    }

    // Otherwise, return the formatted date
    return dateFormatter(transactionDateStr);
};