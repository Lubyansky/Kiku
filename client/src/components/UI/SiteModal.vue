<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'site-modal'
}
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-wrapper {
        position: relative;
    }

    .modal-container {
        max-width: 400px;
        width: 100%;
        margin: 0px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    }

    .modal-enter-active,
    .modal-leave-active {
        transition: opacity 0.5s ease;
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
    }
</style>