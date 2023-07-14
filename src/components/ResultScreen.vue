<script setup lang="ts">
    import { useApiStore } from '@/stores/api';
    import { useStepStore } from '@/stores/step';

    // for this screen trying out composition API
    const api = useApiStore()   
    const steps = useStepStore()

    const goBack = () => {
        steps.decrement()
    }

    const restart = () => {
        steps.restart()
    }

</script>

<template>
    <div class="container">
        <PanelComponent header="Bridgit Calculator">
            <div class="result-container">
                <h1>Result</h1>
                <h2 :class="{ 'invalid': !api.response.approved, 'valid': api.response.approved }">{{ api.response.approved ? 'Loan approved' : 'Loan not Approved' }}</h2>
            </div>
            <div class="buttons">
                <ButtonComponent label="Restart" icon="pi pi-angle-left" iconPos="left" @click="restart"/>
                <ButtonComponent label="Back" severity="secondary" @click="goBack"/>
            </div>
        </PanelComponent>
    </div>
</template>

<style>
    .result-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        margin-bottom: 20px;
    }
    .valid {
        color: var(--green-500);
    }
    .invalid {
        color: var(--red-500);
    }

</style>