import React, { useState } from 'react'
import './TransactionItem.scss'

const TransactionItem = ({ date, description, amount, balance }) => {
    const [open, setOpen] = useState(false)

    const toggle = () => setOpen(!open)

    return (
        <div className={`transaction-item ${open ? 'open' : ''}`}>
            {/* Ligne principale cliquable */}
            <div className="transaction-main" onClick={toggle}>
                <span>{date}</span>
                <span>{description}</span>
                <span>{amount}</span>
                <span>{balance}</span>
                <span className="arrow">
                    <i className={`fa-solid ${open ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </span>
            </div>

            {/* Détails visibles si "open" */}
            {open && (
                <div className="transaction-details">
                    <div className="detail-label">Transaction type</div>
                    <div className="detail-label">Category</div>
                    <div className="detail-label">Note</div>
                </div>
            )}
        </div>
    )
}

export default TransactionItem
