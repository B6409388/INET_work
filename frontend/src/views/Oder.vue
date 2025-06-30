<template>
    <div class="order-container">
        <h1 class="order-title">🛒 รายการสั่งซื้อของคุณ</h1>
        <ul class="order-list">
            <li v-for="order in orders" :key="order._id" class="order-item">
                <div class="order-card">
                    <div class="order-header">
                        <span class="order-id"><strong>Order ID:</strong> {{ order.order_id }}</span>
                        <span class="order-total"><strong>รวมราคา:</strong> {{ order.total_price }} บาท</span>
                    </div>
                    <ul class="item-list">
                        <li v-for="item in order.items" :key="item._id" class="item-row">
                            <span class="order-name">สินค้า: {{ item.product.name }}</span>
                            <span class="order-amount">x{{ item.quantity }}</span>
                        </li>
                    </ul>
                    <button
                        class="cancel-btn"
                        @click="cancelOrder(order._id)"
                    >
                        ยกเลิกการสั่งซื้อ
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Order',
    data() {
        return {
            orders: []
        };
    },
    mounted() {
        this.fetchOrders();
    },
    methods: {
        fetchOrders() {
            const token = localStorage.getItem('token');
            this.axios
                .get("http://localhost:3000/api/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    this.orders = res.data;
                })
                .catch((err) => {
                    console.error(err.response?.data || err);
                });
        },
        cancelOrder(orderId) {
            if (!confirm('คุณต้องการยกเลิกคำสั่งซื้อนี้ใช่หรือไม่?')) return;
            const token = localStorage.getItem('token');
            this.axios
                .delete(`http://localhost:3000/api/orders/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    this.orders = this.orders.filter(order => order._id !== orderId);
                })
                .catch((err) => {
                    alert('ไม่สามารถยกเลิกคำสั่งซื้อได้');
                    console.error(err.response?.data || err);
                });
        }
    }
};
</script>

<style scoped>
.order-container {
    max-width: 600px;
    margin: 40px auto;
    padding: 24px;
    background: #f9f9fb;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}

.order-title {
    text-align: center;
    color: #2d3748;
    margin-bottom: 32px;
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: 1px;
}

.order-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.order-item {
    margin-bottom: 24px;
}

.order-card {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    transition: box-shadow 0.2s;
}

.order-card:hover {
    box-shadow: 0 6px 24px rgba(0,0,0,0.12);
}

.order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 1.1rem;
    color: #4a5568;
}

.order-id {
    font-weight: 500;
}

.order-total {
    color: #3182ce;
    font-weight: 600;
}

.item-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.item-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #edf2f7;
    font-size: 1rem;
}

.item-row:last-child {
    border-bottom: none;
}

.order-name {
    color: #2b6cb0;
    font-weight: 500;
}

.order-amount {
    color: #718096;
    font-weight: 500;
}

.cancel-btn {
    margin-top: 16px;
    background: #e53e3e;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
}

.cancel-btn:hover {
    background: #c53030;
}
</style>
