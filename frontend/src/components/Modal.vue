/* eslint-disable */
<template>
    <div v-if="openModal" class="modal modal-mask" style="display: block">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header div-responsive">
                    <div class="modal-title"><h4>Message Box</h4></div>
                    <button type="button" class="close" @click="handleModal" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body div-responsive">
                    <Success v-bind:message="message" />
                </div>
                <div class="modal-footer div-responsive">
                    <button type="button" class="btn btn-secondary" @click="handleModal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Success from './Success'

export default {
    name: 'Modal',
    components: {
        Success
    },
    props: ['message', 'redirect'],
    data () {
        return {
            openModal: false
        }
    },
    methods: {
        handleModal(e) {
            this.openModal = !this.openModal;
            if(e && e.target && this.redirect) {
                window.location = this.redirect;
            }
        }
    }
}
</script>

