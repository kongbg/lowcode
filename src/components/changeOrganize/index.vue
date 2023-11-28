<template>
    <div class="change-theme__wrapper">
        <el-cascader
            v-model="currentOrganize"
            size="small"
            :show-all-levels="false"
            placeholder="请选择组织"
            :options="organizetree"
            :props="{ checkStrictly: true, value:'id', label:'name' }"
            @change="change"
        >
        </el-cascader>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
    name: "ChangeTheme",
    data() {
        return {
            organize: '',
        }
    },
    computed: {
        ...mapGetters(['organizetree', 'currentOrganize'])
    },
    created() {},
    methods: {
        ...mapMutations(['SET_CURRENTORGANIZE']),
        change (val) {
            this.SET_CURRENTORGANIZE(val)
        }
    }
}
</script>