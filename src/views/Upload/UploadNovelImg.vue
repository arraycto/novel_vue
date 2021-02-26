<template>
	<el-upload
	  class="avatar-uploader"
	  action="http://39.107.68.86:8888/uploadNovelImg"
		ref="uploadNovel"
		:data="uploadData"
		:auto-upload="false"
	  :show-file-list="false"
		:on-change="changeFile"
		:on-success="handle_success"
		:on-error="handle_error"
		:on-exceed="uploadExceed" 
		:limit="1"
		name="file"
	  >
	  <img v-if="imageUrl" :src="imageUrl" class="avatar">
	  <i v-else class="el-icon-plus avatar-uploader-icon"><div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div></i>
	</el-upload>
</template>

<script>
	export default {
		name: 'uploadNovelImg',
		data() {
			return {
				imageUrl: '',
				imageBaseUrl: ''
			}
		},
		computed: {
			uploadData() {
				return {novelName: this.$parent.$parent.model.name}
			}
		},
		methods: {
			uploadExceed(files, fileList) {
				this.$set(fileList[0], 'raw', files[0]);
				this.$set(fileList[0], 'name', files[0].name);
				this.$refs['uploadNovel'].clearFiles();//清除文件
				this.$refs['uploadNovel'].handleStart(files[0]);//选择文件后的赋值方法
			},
			changeFile(file, fileList) {
				const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isIMAGE) {
					this.$message.error('上传的文件格式错误!');
					return;
				}
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
					return;
				}
				// setTimeout(() => {
				// 			this.$emit('file',file)
				// 		}, 500)
				// this.$emit('click',file)
				
				
				
				const This = this;
				const reader = new FileReader();
				reader.readAsDataURL(file.raw);
				reader.onload = function(e){
						this.result; //base64编码
						This.imageBaseUrl = this.result;
						This.imageUrl = this.result;
				}

			},
			//上传成功的钩子，res为后端返回的值
			handle_success(res){
				if(res.status == 200){
							// this.$router.push("/upload")
							location.reload()//刷新页面
					}else{
						this.$notify.error({
							title: '图片上传失败',
							message: '请稍后重试',
							offset: 100
						})
					}	
			},
			//上传失败的钩子
			handle_error(err){
				this.$notify.error({
					title: '图片上传失败',
					message: '请稍后重试',
					offset: 100
				})
			}
		}
	}
</script>

<style>
	@media screen and (min-width : 768px) {
		.avatar-uploader .el-upload {
		   border: 1px dashed #d9d9d9;
		   border-radius: 6px;
		   cursor: pointer;
		   position: relative;
		   overflow: hidden;
		 }
		 .avatar-uploader .el-upload:hover {
		   border-color: #409EFF;
		 }
		 .avatar-uploader-icon {
		   font-size: 28px;
		   color: #8c939d;
		   width: 220px;
		   height: 270px;
		   line-height: 220px;
		   text-align: center;
		 }
		 .avatar {
		   width: 220px;
		   height: 270px;
		   display: block;
		 }
		.el-upload__tip {
			position: absolute;
			top: 50px;
			left: 10px;
		}
	}
	
	@media screen and (max-width : 768px) {
		.avatar-uploader .el-upload {
		   border: 1px dashed #d9d9d9;
		   border-radius: 6px;
		   cursor: pointer;
		   position: relative;
		   overflow: hidden;
		 }
		 .avatar-uploader .el-upload:hover {
		   border-color: #409EFF;
		 }
		 .avatar-uploader-icon {
		   font-size: 28px;
		   color: #8c939d;
		   width: 220px;
		   height: 270px;
		   line-height: 220px;
		   text-align: center;
		 }
		 .avatar {
		   width: 220px;
		   height: 270px;
		   display: block;
		 }
		.el-upload__tip {
			position: absolute;
			top: 50px;
			left: 10px;
		}
	}
</style>
