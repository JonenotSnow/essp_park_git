export const service = {
	// -服务相关接口
	getGoodsClass: '/goods/goods_class_load',
	// -服务上传图片接口
	uploadImage: '/store/accessory/img_upload',
	// -创建/编辑服务
	goods_submit: '/goods/goods_submit',
	// -编辑服务获取数据
	getGoodsData: 'goods/goods_edit',
	// -编辑删除图片
	goods_img_delete: 'goods/img_delete',
	
	// -获取橱窗类型
	getStoreType: 'store/store_home_show',
	// -获取橱窗编辑数据
	getStoreData: 'store/store_template_choice',
	// -删除图片-单张
	delete_img: 'store/img_delete_store',
	// -上传橱窗logo图片
	upload_store_logo: '/store/accessory/save_store_logo_photo',
	// -上传横幅图片banner
	upload_store_banner: '/store/accessory/save_store_banner_photo',
	// -上传轮播图片
	upload_store_slider: "/store/accessory/save_store_broadcast_photo",
	
	// -上传我们为你提供图片provide
	upload_store_provide: '/store/accessory/save_store_provideyou_photo',
	// -上传为什么选择我们图片chooseUs
	upload_store_chooseUs: '/store/accessory/save_store_chooseus_photo',
	// -上传为什么选择我们图片aboutUs
	upload_store_aboutUs: '/store/accessory/save_store_aboutus_photo',
	
	// -模板二为你提供图片上传
	upload_store_provide_template2: '/store/accessory/save_store_template2_provideyou_photo',
	// -模板二为什么选择我们图片上传
	upload_store_chooseUs_template2: '/store/accessory/save_store_template2_chooseus_photo',
	// -模板二荣誉资质
	upload_store_honors_template2: "/store/accessory/save_store_template2_Honors_photo",
	
	// -发布接口
	store_set_save: '/store/store_set_save',

	//上传商品图片
	uploadCommodityImage: '/store/accessory/commodity_img_upload',
	// 删除商品图片
	delCommodityImage: '/commodity/img_delete',
	// -获取编辑商品数据
	getCommodityData: '/commodity/edit',
	// 获取商品标签
	getCommodityTag: '/tag/findEntityTags',
	// 保存商品标签
	saveCommodityTag: '/tag/saveEntityTags',

}
