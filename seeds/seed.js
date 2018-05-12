const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '106.15.230.136',
    user: 'super',
    password: 'zhazhahui',
    database: 'supermall'
  }
})

let admin = {
  name: 'super',
  phone: '18585855858'
}

let goods = [
  {
    serial: 'A0001',
    name: '海南西瓜',
    price: '28.8',
    description: '来自海南的西瓜'
  },
  {
    'serial': 'A0002',
    'name': '新疆西瓜',
    'price': '38.8',
    'description': '来自新疆的西瓜'
  },
  {
    'serial': 'A0003',
    'name': '新疆哈密瓜',
    'price': '58.8',
    'description': '来自新疆的哈密瓜'
  }
]

const seed = async (admin, goods) => {
  const trx = await knex.transaction()
  try {
    await trx('admin').insert(admin)
    for (let i = 0; i < goods.length; i++) {
      await trx('goods').insert(goods[i])
    }
    await trx.commit()
    return '导入成功'
  } catch (err) {
    await trx.rollback()
    return '导入错误'
  }
}

seed(admin, goods)
