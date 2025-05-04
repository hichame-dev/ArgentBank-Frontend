import React from 'react'
import TransactionItem from '../../components/Transaction/TransactionItem'
import './TransactionsPage.scss'

const TransactionsPage = () => {
    const transactions = [
        {
            date: '27/02/20',
            description: 'Golden Sun Bakery',
            amount: '$8.00',
            balance: '$298.00',
            type: 'Electronic',
            category: 'Food',
            note: 'lorem ipsum',
        },
        {
            date: '26/02/20',
            description: 'Starbucks',
            amount: '$5.50',
            balance: '$290.00',
            type: 'Card',
            category: 'Drink',
            note: 'coffee break',
        },
    ]

    return (
        <main className="transactions-page">
            {/* Bandeau du compte */}
            <div className="account-banner">
                <div className="account-summary">
                    <h3>Argent Bank Checking (x3448)</h3>
                    <p className="account-balance">$48,098.43</p>
                    <p className="balance-label">Available balance</p>
                </div>
                <div className="close-btn">✕</div>
            </div>

            {/* En-têtes de colonnes */}
            <div className="transactions-header">
                <span>Date</span>
                <span>Description</span>
                <span>Amount</span>
                <span>Balance</span>
            </div>

            {/* Liste des transactions */}
            {transactions.map((tx, index) => (
                <TransactionItem key={index} {...tx} />
            ))}
        </main>
    )
}

export default TransactionsPage
