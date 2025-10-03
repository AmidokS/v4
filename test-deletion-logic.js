// Простой тест логики удаления
console.log('🧪 Тестируем логику синхронизации удаления...');

// Симуляция данных
const testTransactions = [
    { id: 'trans1', firebaseId: 'fb1', description: 'Покупка 1', amount: -100 },
    { id: 'trans2', firebaseId: 'fb2', description: 'Покупка 2', amount: -200 },
    { id: 'trans3', firebaseId: 'fb3', description: 'Доход 1', amount: 500 }
];

const testDeletedList = ['trans2', 'fb3']; // Удалили вторую транзакцию по ID и третью по firebaseId

console.log('📋 Исходные транзакции:', testTransactions);
console.log('🗑️ Список удаленных:', testDeletedList);

// Имитация функции mergeDeletedTransactions
function testMergeDeletedTransactions(transactions, deletedList) {
    const filteredTransactions = transactions.filter(transaction => {
        const isDeleted = deletedList.includes(transaction.id) || 
                         deletedList.includes(transaction.firebaseId);
        
        if (isDeleted) {
            console.log('🗑️ Удаляем транзакцию:', transaction.id, transaction.description);
            return false;
        }
        return true;
    });
    
    console.log('✅ Результат после фильтрации:', filteredTransactions);
    return filteredTransactions;
}

// Запуск теста
const result = testMergeDeletedTransactions(testTransactions, testDeletedList);

console.log('');
console.log('📊 Результаты теста:');
console.log('- Исходно транзакций:', testTransactions.length);
console.log('- После удаления:', result.length);
console.log('- Удалено:', testTransactions.length - result.length);

// Проверяем что правильные транзакции остались
const expectedRemaining = ['trans1']; // Должна остаться только первая транзакция
const actualRemaining = result.map(t => t.id);

console.log('- Ожидалось остаться:', expectedRemaining);
console.log('- Фактически осталось:', actualRemaining);

if (JSON.stringify(expectedRemaining.sort()) === JSON.stringify(actualRemaining.sort())) {
    console.log('✅ Тест ПРОЙДЕН: логика удаления работает корректно');
} else {
    console.log('❌ Тест ПРОВАЛЕН: логика удаления работает неправильно');
}