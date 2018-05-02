const getSortSql = (sql, sortStr) => {
  sortStr = sortStr || '-id'
  const sortArr = sortStr.split(',')
  sortArr.map(sortRule => {
    let field = sortRule
    if (sortRule.startsWith('-') || sortRule.startsWith('+')) {
      field = sortRule.substring(1)
    }
    sql = sql.orderBy(`${field}`, sortRule.startsWith('-') ? 'desc' : 'asc')
  })
  return sql
}

export {
  getSortSql
}
