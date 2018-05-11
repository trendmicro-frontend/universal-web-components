<template>
    <div class="process">
        <div class="step">
            <div v-for="(item,index) in processes" class="step_item">
                <div class="step_icon" :class="icon(index)">
                    <div class="circle">
                        <div class="number">{{item.step}}</div>
                        <div class="text">
                            {{item.action}}
                        </div>
                    </div>
                </div>
                <div :class="bar(index)" class="bar"  v-show="index != processes.length - 1"></div>
            </div>
        </div>
        <div class="description">
            {{this.processes[this.current-1].description}}
            
        </div>
        <div class="percent">
            <span class="loader"></span><span class="percent_number">{{percent}}%</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'TmVueStepProcess',
        props:{
            processes:{
                type:Array,
                default:[]
            },
            percent:{//total percent.
                type:Number,
                default:0
            },
            current:{//current step
                type:Number,
                default:1
            }
        },
        methods:{
           bar(index){
                if(index < this.current-1){
                    var disabled = "";
                }else{
                    var disabled = "disabled";
                }
                return "bar-"+this.processes.length+"-length " +disabled;   
            },
            icon(index){
                if(index <= this.current -1 ){
                    return "";
                }else{
                    return "disabled";
                }
            },
            step(){
                return "step-"+this.processes.length;
            }           
        }
        
    }
</script>