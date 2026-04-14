// 药品数据加载模块

const MedicineData = {
  // 数据缓存
  cache: null,
  
  // 加载所有药品数据
  async loadAll() {
    if (this.cache) return this.cache;
    
    const categories = [
      'cardiovascular', 'diabetes', 'respiratory', 
      'digestive', 'nervous', 'antiinfective', 'dermatology'
    ];
    
    let allMedicines = [];
    
    for (const cat of categories) {
      try {
        // 使用绝对路径（相对于网站根目录）
        const res = await fetch(`data/medicines-${cat}.json`);
        const data = await res.json();
        allMedicines = allMedicines.concat(data.medicines);
      } catch (e) {
        console.error(`加载 ${cat} 失败:`, e);
      }
    }
    
    this.cache = allMedicines;
    return allMedicines;
  },
  
  // 搜索药品
  async search(query) {
    const medicines = await this.loadAll();
    if (!query) return medicines;
    
    query = query.toLowerCase();
    return medicines.filter(m => 
      m.name.toLowerCase().includes(query) ||
      m.genericName.toLowerCase().includes(query) ||
      m.brandName.toLowerCase().includes(query) ||
      m.indication.toLowerCase().includes(query)
    );
  },
  
  // 按ID查询
  async getById(id) {
    const medicines = await this.loadAll();
    return medicines.find(m => m.id === id);
  },
  
  // 按分类查询
  async getByCategory(category) {
    const medicines = await this.loadAll();
    return medicines.filter(m => m.category === category);
  }
};