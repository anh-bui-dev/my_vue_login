/* eslint-disable */
<template>
    <transition v-if="showModal" ref="modal" name="modal">
        <div class="modal modal-mask" style="display: block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header div-responsive">
                        <div class="modal-title"><h4>Message Box</h4></div>
                        <button type="button" class="close" @click="hide" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body div-responsive">
                        <Success v-bind:message="message" />
                        <div class="info" v-if="user!=null">
                            <h6>Welcome, {{ user.name }}</h6>
                        </div>
                    </div>
                    <div class="modal-footer div-responsive">
                        <button type="button" class="btn btn-secondary" @click="hide">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Success from './Success'

export default {
    name: 'Modal',
    components: {
        Success
    },
    props: ['message', 'user'],
    data () {
        return {
            showModal: false
        }
    },
    methods: {
        show () {
            this.showModal = true;
        },
        hide () {
             this.showModal = false;
        }
    }
}
</script>

