import React from 'react'


const Transactions = () => {
    console.log('[Transactions.jsx] Loaded transaction list')

    const accounts = [
        {
            title: 'Argent Bank Checking (x8349)',
            amount: '$2,082.79',
            description: 'Available Balance',
        },
        {
            title: 'Argent Bank Savings (x6712)',
            amount: '$10,928.42',
            description: 'Available Balance',
        },
        {
            title: 'Argent Bank Credit Card (x8349)',
            amount: '$184.30',
            description: 'Current Balance',
        },
    ]

    return (
        <section className="transactions">
            <h2 className="sr-only">Accounts</h2>
            {accounts.map((account, index) => (
                <div className="account" key={index}>
                    <div className="account-content-wrapper">
                        <h3 className="account-title">{account.title}</h3>
                        <p className="account-amount">{account.amount}</p>
                        <p className="account-amount-description">
                            {account.description}
                        </p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default Transactions
