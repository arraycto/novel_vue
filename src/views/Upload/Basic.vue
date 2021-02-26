<template>
	<div class="basic">
		<div class="title1">基本信息</div>
		<div class="title2">扫书</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item class="inputWidth1" label="小说名" prop="name">
		    <el-input v-model="ruleForm.name"></el-input>
		  </el-form-item>
			
			<el-form-item class="inputWidth2" label="作者" prop="author">
			  <el-input v-model="ruleForm.author"></el-input>
			</el-form-item>
			
		  <el-form-item class="inputWidth3" label="小说类型" prop="type">
		    <el-select v-model="ruleForm.type" placeholder="请选择小说类型">
		      <el-option label="都市青春" value="都市青春"></el-option>
					<el-option label="玄幻奇幻" value="玄幻奇幻"></el-option>
					<el-option label="灵异未知" value="灵异未知"></el-option>
					<el-option label="历史军事" value="历史军事"></el-option>
					<el-option label="科技无限" value="科技无限"></el-option>
					<el-option label="游戏竞技" value="游戏竞技"></el-option>
					<el-option label="仙侠武侠" value="仙侠武侠"></el-option>
					<el-option label="免费同人" value="免费同人"></el-option>
		    </el-select>
		  </el-form-item>
			
			<el-form-item class="inputWidth4" label="小说字数" prop="wordNum">
			    <el-input v-model="ruleForm.wordNum">
			      <template slot="append">万字</template>
			    </el-input>
			</el-form-item>
			
			<el-form-item label="小说封面" prop="img">
			  <UploadNovelImg ref="uploadNovelImg"></UploadNovelImg>
			</el-form-item>
			
		  <el-form-item label="小说简介" prop="desc">
		    <el-input type="textarea" rows=9 maxlength="400" resize="none" show-word-limit v-model="ruleForm.desc"></el-input>
		  </el-form-item>
			
			<el-divider class="el_divider"></el-divider>
			
			<el-form-item class="nodeMargin" label="扫书" prop="note">
			  <el-input type="textarea" rows=11 maxlength="1000" resize="none" show-word-limit v-model="ruleForm.note"></el-input>
			</el-form-item>
			
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')" v-preventReClick>上传</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	import UploadNovelImg from './UploadNovelImg.vue'
	import {request} from '../../network/request.js'
	export default {
		name: 'basic',
		data() {
			return {
				ruleForm: {
					name: '',
					author: '',
					type: '',
					wordNum: '',
					desc: '',
					note: ''
				},
				rules: {
					name: [
						{ required: true, message: '请输入小说名', trigger: 'blur' },
						{ min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
					],
					author: [
						{ required: true, message: '请输入作者', trigger: 'blur' },
						{ min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
					],
					type: [
						{ required: true, message: '请选择小说类型', trigger: 'change' }
					],
					desc: [
						{ required: true, message: '请填写小说简介', trigger: 'blur' }
					],
					wordNum: [
						{required: false, message: '请填写小说字数', trigger: 'blur'},
						{ min: 1, max: 10, pattern: /^[1-9]{1}[0-9]*\.[0-9]{2}$/, message: '长度在 1 到 10 小数位数为2的数字', trigger: 'blur' }
					],
					note: [
						{required: true, message: '请填写扫书记录', trigger: 'blur'}
					]
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						//验证token
						if (window.localStorage.getItem("token") != null) {
									new Promise((resolve,reject) => {
										//判断token是否过期
										request({
											url: '/verification',
											method: 'post'
										}).then(res => {
											if(res.status == 201){//token过期
												window.localStorage.clear()
												store.commit('updataUserName')
												store.commit('updataImg')
												this.$router.push('/login')
												return false
											}
											resolve("token未过期")
										})
										
									}).then( resolve => { //上传除了图片的数据
												return request({
																url: '/uploadNovel',
																method: 'post',
																data: {
																	novelName: this.ruleForm.name,
																	novelAuthor: this.ruleForm.author,
																	novelType: this.ruleForm.type,
																	novelNum: this.ruleForm.wordNum,
																	novelIntroduction: this.ruleForm.desc,
																	novelNote: this.ruleForm.note
																}
															}).then(res => {
																if(res.status == 400){
																	this.$notify.error({
																		title: '上传失败',
																		message: '该小说已被上传过了',
																		offset: 100
																	})
																	return false
																}else if(res.status == 401){
																	this.$notify.error({
																		title: '上传失败',
																		message: '请稍后重试',
																		offset: 100
																	})
																	return false
																}else if(res.status == 200){
																	this.$notify({
																		title: '上传成功',
																		type: 'success',
																		offset: 100
																	})	
																}
															})
									}).then( resolve => {
										this.$refs.uploadNovelImg.$refs.uploadNovel.submit()
										// setTimeout(() => {
													
										// 		}, 500)
									})
									
						}else{
							this.$router.push('/login')
						}
					} else {
						this.$notify.error({
							title: '上传失败',
							message: '格式错误',
							offset: 100
						})
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},
		components: {
			UploadNovelImg
		}
	}
</script>

<style>
	@media screen and (min-width : 768px) {
		.basic {
			position: absolute;
			top: 10px;
			left: 20%;
			width: 60%;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)
		}
		.basic .title1 {
			margin-top: 20px;
			margin-bottom: 10px;
			margin-left: 40px;
			font-size: 23px;
			font-weight: 700;
		}
		.basic .title2 {
			position: absolute;
			margin-left: 40px;
			top: 860px;
			font-size: 23px;
			font-weight: 700;
		}
		
		.demo-ruleForm {
			width: 70%;
			margin: 0 auto;
		}
		.demo-ruleForm .el_divider {
			width: 100%;
		}
		.demo-ruleForm .inputWidth1 {
			width: 300px;
		}
		.demo-ruleForm .inputWidth2 {
			width: 300px;
		}
		.demo-ruleForm .inputWidth3 {
			width: 250px;
		}
		.demo-ruleForm .inputWidth4 {
			width: 300px;
		}
		.demo-ruleForm .nodeMargin {
			margin-top: 80px;
		}
	}
	
	@media screen and (max-width : 768px) {
		.basic {
			position: absolute;
			/* left: 5%; */
			width: 100%;
			height: 94%;
			top: 70px;
			overflow-x: hidden; 
			overflow-y: auto
			/* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3) */
		}
		.basic .title1 {
			margin-top: 20px;
			margin-bottom: 10px;
			margin-left: 40px;
			font-size: 23px;
			font-weight: 700;
		}
		.basic .title2 {
			position: absolute;
			margin-left: 40px;
			top: 910px;
			font-size: 23px;
			font-weight: 700;
		}
		
		.demo-ruleForm {
			width: 90%;
			margin: 0 auto;
		}
		.demo-ruleForm .el_divider {
			width: 100%;
		}
		.demo-ruleForm .inputWidth1 {
			width: 380px;
		}
		.demo-ruleForm .inputWidth2 {
			width: 380px;
		}
		.demo-ruleForm .inputWidth3 {
			width: 245px;
		}
		.demo-ruleForm .inputWidth4 {
			width: 320px;
		}
		.demo-ruleForm .nodeMargin {
			margin-top: 80px;
		}
	}
</style>
