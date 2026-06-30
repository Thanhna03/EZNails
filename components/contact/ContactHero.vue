<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <section v-if="block.status" :data-cms-bind="dataBinding" :style="backgroundComputed" class="py-10">
    <div class="container">
      <div class="w-full flex flex-col gap-4 pb-4">
        <div v-if="block.map_title" itemprop="title" class="title_contact text-[18px] ckeditor-custom"
          v-html="block.map_title" />
        <div v-for="(item, index) in settingData.iframe_map" :key="index" v-show="item.is_show" class="google-maps"
          v-html="item.content" />
      </div>
      <div class="flex flex-col lg:gap-4 gap-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="flex flex-col gap-[33px]">
            <!-- Address -->
            <div v-for="(item, index) in settingData.address" :key="`address-${index}`" v-show="item.is_show"
              class="flex gap-[20px] w-full h-full items_contact">
              <div class="border-[1px] border-main rounded-full p-2 w-10 h-10">
                <img v-if="block.address.address_icon" :src="block.address.address_icon" alt="Address icon"
                  class="image w-6 h-6" />
              </div>
              <div class="flex flex-col gap-[3px]">
                <h2 class="font-sans text-secondary text-[18px] leading-[24px] font-semibold">
                  {{ block.address.title }}
                </h2>
                <NuxtLink :to="item.url" class="text-[14px] leading-[24px] text-white">
                  {{ item.content }}
                </NuxtLink>
              </div>
            </div>

            <!-- Phone -->
            <div v-for="(item, index) in settingData.phone" :key="`phone-${index}`" v-show="item.is_show"
              class="flex gap-[20px] w-full h-full items_contact">
              <div class="border-[1px] border-main rounded-full p-2 w-10 h-10">
                <img v-if="block.phone.phone_icon" :src="block.phone.phone_icon" alt="Phone icon"
                  class="image w-6 h-6" />
              </div>
              <div class="flex flex-col gap-[3px]">
                <h2 class="font-sans text-secondary text-[18px] leading-[24px] font-semibold">
                  {{ block.phone.title }}
                </h2>
                <NuxtLink :to="item.url" class="text-[14px] eading-[24px] text-white">
                  {{ item.content }}
                </NuxtLink>
              </div>
            </div>

            <!-- Email -->
            <div v-for="(item, index) in settingData.email" :key="`email-${index}`" v-show="item.is_show"
              class="flex gap-[20px] w-full h-full items_contact">
              <div class="border-[1px] border-main rounded-full p-2 w-10 h-10">
                <img v-if="block.email.email_icon" :src="block.email.email_icon" alt="Email icon"
                  class="image w-6 h-6" />
              </div>
              <div class="flex flex-col gap-[3px]">
                <h2 class="font-sans text-secondary text-[18px] leading-[24px] font-semibold">
                  {{ block.email.title }}
                </h2>
                <NuxtLink :to="item.url" class="text-[14px] leading-[24px] text-white">
                  {{ item.content }}
                </NuxtLink>
              </div>
            </div>
          </div>
          <!-- Opening Hours -->
          <div v-if="settingData.business && settingData.business.is_show" class="flex gap-[20px] w-full h-full items_contact">
            <div class="border-[1px] border-main rounded-full p-2 w-10 h-10">
              <img src="/images/icons8-clock-50 (2).png" class="image w-6 h-6" />
            </div>
            <div class="flex flex-col gap-[3px]">
              <h2 class="font-sans text-secondary text-[18px] leading-[24px] font-semibold">
                {{ block.business_hours_title }}
              </h2>
              <div v-for="(elm, idx) in settingData.business.list_item" :key="idx" class="flex flex-col gap-[10px]">
                <div class="flex gap-[15px] justify-start items-center">
                  <b class="w-[75px] text-[14px] leading-[1.5em] text-white font-bold whitespace-nowrap min-w-[70px]">{{
                    elm.label }}</b>
                  <p class="text-[14px] text-white  whitespace-nowrap">
                    {{ elm.content }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="py-4 px-4 md:order-1 order-2" :style="{
          color: block.color_input_form
        }">

          <div v-if="block.title_form" itemprop="title" class="title_contact text-[18px] ckeditor-custom"
            v-html="block.title_form" />

          <div v-if="block.list_fields" class="flex flex-wrap -mx-2">
            <div v-for="(item, key) in block.list_fields" :key="key" :class="[
              item.width_fields === '1/2' ? 'w-full md:w-1/2' : 'w-full',
              'px-2'
            ]">
              <!-- Text / Email / Tel / Textarea -->
              <div v-if="['text', 'email', 'tel', 'textarea'].includes(item.fields)" class="mb-4">
                <label v-if="item.is_show" class="block text-xl text-foreground" :for="`field-${key}`">
                  {{ item.label }}
                  <span v-if="item.status_error">(required)<span
                      class="text-danger ml-1 text-md font-bold">*</span></span>
                </label>

                <input v-if="item.fields !== 'textarea'" :id="`field-${key}`" :name="`field-${key}`" :type="item.field"
                  v-model="formState[key].value"
                  class="mt-1 block w-full rounded-xl border px-5 py-4 text-xl bg-[#EFF1F5]"
                  :class="(item.status_error && fieldError[key] && !formState[key].value) ? 'border-danger' : 'border-[transparent]'"
                  :placeholder="item.placeholder || ''" :maxlength="item.fields === 'tel' ? 12 : undefined"
                  @input="item.fields === 'tel' ? onPhoneNumberInput($event) : null" />

                <textarea v-else rows="5" :id="`field-${key}`" :name="`field-${key}`" v-model="formState[key].value"
                  :placeholder="item.placeholder || ''"
                  class="mt-1 block w-full rounded-xl border px-5 py-4 text-xl bg-[#EFF1F5]"
                  :class="(item.status_error && fieldError[key] && !formState[key].value) ? 'border-danger' : 'border-[transparent]'"></textarea>

                <template v-if="item.status_error">
                  <div v-if="fieldError[key] && !formState[key].value" class="text-danger text-sm mt-1 font-medium">
                    {{ item.error }}
                  </div>

                  <div v-else-if="item.fields === 'tel' && errorPhone" class="text-danger text-sm mt-1 font-medium">
                    Invalid phone number format.
                  </div>

                  <div v-else-if="item.fields === 'email' && errorEmail" class="text-danger text-sm mt-1 font-medium">
                    Invalid email format.
                  </div>
                </template>
              </div>

              <!-- File Upload -->
              <div v-if="item.fields === 'file'" class="mb-4">
                <label v-if="item.is_show" class="block text-xl text-foreground" for="fileInput">
                  {{ item.label }}
                  <span v-if="item.status_error">(required)<span
                      class="text-danger ml-1 text-md font-bold">*</span></span>
                </label>

                <div
                  :class="{ 'border-danger': (item.status_error && fieldError[key] && !formState[key].value) === true }"
                  class="w-full py-9 border border-gray-300 gap-3 grid border-dashed bg-white" @dragover.prevent
                  @drop.prevent="handleDropFiles($event, key)">
                  <div class="grid gap-1">
                    <UIcon name="i-mdi-file-document-multiple-outline" class="mx-auto mb-2 size-4" />
                    <span class="text-center text-gray-400 text-sm leading-4">{{ item.placeholder }}</span>
                  </div>
                  <div class="grid gap-2">
                    <span class="text-center text-gray-900 text-sm font-medium leading-snug">Drag and Drop your file
                      here or</span>
                    <div class="flex items-center  justify-center">
                      <label>
                        <input id="fileInput" name="fileInput" accept="image/*,.pdf" :type="item.fields" multiple hidden
                          @change="handleFileChange($event, key)" />
                        <div :style="{
                          borderRadius: block.button.border ? `${block.button.border}px` : '0px',
                          color: block.button.color,
                          backgroundColor: block.button.variant === 'solid' ? block.button.background_color : 'transparent',
                          border: `2px solid ${block.button.background_color}`
                        }"
                          class="flex w-28 h-9 px-2 flex-col rounded-full shadow text-foreground leading-4 items-center justify-center cursor-pointer focus:outline-none">
                          Choose File
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div v-if="item.status_error && fieldError[key] && !formState[key].value">
                  <span class="text-danger text-[14px] font-medium">{{ item.error }}</span>
                </div>
                <!-- list file complete-->
                <div v-if="listFilesComplete[key]" class="mt-[5px] w-full">
                  <div v-for="(file, index) in listFilesComplete[key]?.value" :key="index + file?.url"
                    class="w-full grid gap-1 mb-4">
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <UIcon name="i-mdi-file-document-multiple-outline" class="size-7"
                          :style="{ color: block.button.background }" />
                        <div class="grid gap-1">
                          <NuxtLink :to="file.url" target="_blank">
                            <span class="text-gray-900 text-sm font-normal leading-snug">{{ file.name }}</span>
                          </NuxtLink>
                          <span class="text-gray-400 text-xs font-normal leading-[18px]">Upload complete </span>
                        </div>
                      </div>
                      <div class=" flex items-center gap-2">
                        <div class="icon-cancel cursor-pointer " @click="RemoveFile(index, key, file.url)">
                          <UIcon name="i-mdi-close-box" class="size-7 text-danger" />
                        </div>
                      </div>
                    </div>

                    <div class="relative flex items-center gap-2.5 py-1.5 px-2">
                      <div class="relative  w-full h-2.5 overflow-hidden rounded-3xl bg-gray-100">
                        <div role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                          style="width:100% "
                          class="flex h-full items-center transition-all duration-100 ease-linear justify-center bg-black  text-white rounded-3xl">
                        </div>
                      </div>
                      <span
                        class="ml-2 bg-white rounded-full  text-gray-800 text-xs font-medium flex justify-center items-center">100%</span>
                    </div>
                  </div>
                </div>
                <!-- list file in process upload -->
                <div v-if="listFilesUpload[key]" class=" mt-[5px] w-full">
                  <div v-for="(file, index) in listFilesUpload[key].value" :key="index + file?.size"
                    class="w-full grid gap-1 mb-4">
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <UIcon name="i-mdi-file-document-multiple-outline" class="size-7"
                          :style="{ color: block.button.background }" />
                        <div class="grid gap-1">
                          <span class="text-gray-900 text-sm font-normal leading-snug">{{ file.name }}</span>
                          <span v-if="!statusUploadFile[key]?.value"
                            class="text-red-400 text-xs font-bold leading-[18px]">
                            Upload Fail
                          </span>
                          <span v-else class="text-gray-400 text-xs font-normal leading-[18px]">In processing</span>
                        </div>
                      </div>
                      <div class=" flex items-center gap-2">
                        <svg v-if="!statusUploadFile[key]?.value" xmlns="http://www.w3.org/2000/svg" width="24"
                          height="24" viewBox="0 0 24 24">
                          <path fill="#eb0000" fill-rule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5zM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75m0 8.25a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5"
                            clip-rule="evenodd" />
                        </svg>
                        <div v-else class="icon-cancel cursor-pointer " @click="RemoveFile(index, key, file.url)">
                          <div class="relative" style="width: 24px; height: 24px;">
                            <svg class="size-full -rotate-90" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                              width="24" height="24">
                              <!-- Background Circle -->
                              <circle cx="12" cy="12" r="10" fill="none"
                                class="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="2"></circle>
                              <!-- Progress Circle -->
                              <circle cx="12" cy="12" r="10" fill="none" class="stroke-current" stroke-width="2"
                                stroke-dasharray="62.83"
                                :stroke-dashoffset="62.83 * (1 - percentCompleteUploadFile[key].value / 100)"
                                stroke-linecap="round"></circle>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="relative flex items-center justify-between gap-2.5 py-1.5 ">
                      <span v-if="!statusUploadFile[key]?.value"
                        class="text-red-400 text-xl font-normal leading-[18px]">
                        'Only files with these MIME types are allowed: image/*, application/pdf.'
                      </span>
                      <div v-else class="relative w-full h-2.5 overflow-hidden rounded-3xl bg-gray-100">
                        <div role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" :style="{
                          width: percentCompleteUploadFile[key].value ? `${percentCompleteUploadFile[key].value}%` : '0%'
                        }"
                          class="flex h-full items-center transition-all duration-100 ease-linear justify-center bg-black  text-white rounded-3xl">
                        </div>
                      </div>
                      <div class="flex justify-center items-center">
                        <span v-if="statusUploadFile[key]?.value"
                          class="ml-2 bg-white rounded-full text-gray-800 text-xs font-medium flex justify-center items-center ">{{
                            percentCompleteUploadFile[key].value ? `${percentCompleteUploadFile[key].value}%` : '0%'
                          }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <div class="w-full flex text-xl text-center" :class="{
              'justify-center': block.button.align_button === 'center',
              'justify-start': block.button.align_button === 'left',
              'justify-end': block.button.align_button === 'right'
            }">
              <UButton :loading="isLoadingButton" @click="onSubmit" type="submit" :style="{
                borderRadius: block.button.border ? `${block.button.border}px` : '0px',
                color: block.button.color,
                backgroundColor: block.button.variant === 'solid' ? block.button.background_color : 'transparent',
                border: `2px solid ${block.button.background_color}`
              }" class="justify-center uppercase text-[18px] font-bold h-9" :class="{
                'w-auto': block.button.width_button === 'auto',
                'w-full': block.button.width_button === 'full',
                'w-1/2': block.button.width_button === '1/2',
                'w-1/3': block.button.width_button === '1/3',
                'w-1/4': block.button.width_button === '1/4'
              }">
                {{ block.button.text_button }}
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Notification popup -->
    <div class="popup-notification" v-if="showNotification" :class="{ active: showNotification === true }">
      <div class="popup-content relative p-4">
        <div class="absolute top-2 right-2 mt-2 cursor-pointer w-5 h-5" @click="closePopup()">
          <UIcon name="i-mdi-close" />
        </div>
        <h2 :style="{ color: colorPopup }">{{ popupTitle }}</h2>
        <p>{{ popupMessage }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import dataJson from '@/plugin/data.json';
import footer from "@/data/footer.json";
import setting from "@/data/setting.json";
const languageStore = useLanguageStore();

const footerData = computed(() => languageStore.getLocalizedData(footer));
const settingData = computed(() => languageStore.getLocalizedData(setting));
const homeUrl = computed(() => languageStore.getLocalizedUrl("/"));

interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();
const backgroundComputed = computed(() =>
  props.block.background_image
    ? {
      background: `url(${props.block.background_image}) center / cover`
    }
    : { backgroundColor: props.block.background_color }
);

// Contact form handle
// Tenant ID for form submissions
const tenantId = ref<any>('');
if (dataJson?.length > 0) {
  tenantId.value = dataJson.find((item: any) => {
    return item.plugin_identity === 'com.newzen.contact-plugin';
  })?.data.tenant_id;
}

// Base URL for API calls
const BASE_URL = 'https://contact-form-api.nz-service01.dtsmart.dev';

// Form token
const formToken = ref(btoaUnicode(String(props.block?.title ?? 'Contact Form')));

function btoaUnicode(str: string): string {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
    String.fromCharCode(parseInt(p1, 16))
  ));
}

// UI state
const showNotification = ref(false);
const popupTitle = ref('');
const popupMessage = ref('');
const colorPopup = ref('');
const isLoadingButton = ref(false);
let popupTimeout: NodeJS.Timeout | null = null;

// Email and phone validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
const errorEmail = ref(false);
const errorPhone = ref(false);

// Form state and validation
const fieldError = reactive<Record<string, boolean>>({});
const formState = reactive<Record<string, any>>({});

// File handling state
const statusUploadFile = reactive<Record<string, any>>({});
const listFilesUpload = reactive<Record<string, any>>({});
const listFilesComplete = reactive<Record<string, any>>({});
const percentCompleteUploadFile = reactive<Record<string, any>>({});

// Initialize form state
const convertFormState = () => {
  if (props.block.list_fields) {
    props.block.list_fields.forEach((item: any, indexForm: number) => {
      formState[indexForm] = {
        value: '',
        type: item.fields,
        status_error: item.status_error,
        error: item.error,
      };
    });
  }
};

// Calculate max file size (15MB)
function calculateMBtoBytes(mb: number) {
  const bytesPerMB = 1024 * 1024;
  return mb * bytesPerMB;
}

const maxBytes = calculateMBtoBytes(15);

// Show popup notification
function showPopup(
  title: 'Success' | 'Error' | 'Warning',
  message: string,
  type: 'success' | 'error' | 'warning',
  active: boolean,
  timeout: number = 3000
) {
  // Clear any existing timeout
  if (popupTimeout) {
    clearTimeout(popupTimeout);
  }

  popupTitle.value = title;
  popupMessage.value = message;

  if (type === 'success') {
    colorPopup.value = '#4BB543';
  } else if (type === 'error') {
    colorPopup.value = '#FF0000';
  } else if (type === 'warning') {
    colorPopup.value = '#FFC107';
  }

  showNotification.value = active;

  // Set new timeout to close popup after 3 seconds
  popupTimeout = setTimeout(() => {
    closePopup();
  }, timeout);
}

// File handling functions
const handleFileChange = (event: Event, key: number) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const files = Array.from(target.files) as File[];
    const sizeFiles = files.map((item) => item.size);
    const totalSizeFiles = sizeFiles.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    statusUploadFile[key] = { value: true };
    percentCompleteUploadFile[key] = { value: 0 };

    if (totalSizeFiles > maxBytes) {
      showPopup(
        'Error',
        'Files must be smaller than 15MB in total',
        'error',
        true
      );
      return;
    }

    updateListFiles(files, key);
  }
};

const handleDropFiles = (event: DragEvent, key: number) => {
  if (event.dataTransfer?.files) {
    const files = Array.from(event.dataTransfer.files) as File[];
    const sizeFiles = files.map((item) => item.size);
    const totalSizeFiles = sizeFiles.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    if (totalSizeFiles > maxBytes) {
      showPopup(
        'Error',
        'Files must be smaller than 15MB in total',
        'error',
        true
      );
      return;
    }

    statusUploadFile[key] = { value: true };
    percentCompleteUploadFile[key] = { value: 0 };

    updateListFiles(files, key);
  }
};

function getListUrlFromResponseFile(listFile: any[]) {
  return listFile.map((item: any) => item.url);
}

function updateFilesComplete(listFile: any[], key: number) {
  listFilesComplete[key] = {
    value: listFilesComplete[key]?.value
      ? [...listFilesComplete[key].value, ...listFile]
      : listFile,
  };
}

function updateFormStateForFile(listUrl: string[], key: number) {
  const values = formState[key].value
    ? [...formState[key].value, ...listUrl]
    : listUrl;

  formState[key] = {
    ...formState[key],
    value: listUrl.length > 0 ? values : '',
  };
}

function updateListFiles(files: File[], key: number) {
  listFilesUpload[key] = {
    value: files.length > 0 ? files : [],
  };

  const formData = new FormData();
  formData.append('form_name', props.block.title || 'Contact Form');
  formData.append('tenant_id', tenantId.value || '');
  formData.append('form_token', formToken.value);

  files.forEach((file) => {
    formData.append('file[]', file);
  });

  uploadFile(formData, key);
}

function resetFileInput() {
  const inputFile = document.getElementById('fileInput');
  if (inputFile) {
    (inputFile as HTMLInputElement).value = '';
  }
}

async function RemoveFile(index: number, key: number, url: string) {
  try {
    const body = {
      form_name: props.block.title || 'Contact Form',
      tenant_id: tenantId.value,
      url: url,
      form_token: formToken.value,
    };

    resetFileInput();

    if (formState[key].value && Array.isArray(formState[key].value)) {
      formState[key].value.splice(index, 1);
    }

    if (listFilesComplete[key]?.value) {
      listFilesComplete[key].value.splice(index, 1);
    }

    showPopup(
      'Success',
      'File has been successfully deleted!',
      'success',
      true
    );

    await $fetch(`${BASE_URL}/api/v1/end-user/storage/delete`, {
      method: 'POST',
      body: {
        ...body,
      },
    });
  } catch (error) {
    console.error('Error removing file:', error);
    showPopup(
      'Error',
      'Failed to delete the file. Please try again.',
      'error',
      true
    );
  }
}

// Phone number formatting
const onPhoneNumberInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let input = target.value.replace(/\D/g, '');
  const filteredInput = input
    .split('')
    .filter((char: string) => char >= '0' && char <= '9')
    .join('');
  let formattedInput;

  if (filteredInput.length > 6) {
    formattedInput = filteredInput.replace(
      /(\d{3})(\d{3})(\d{1,4})/,
      '$1-$2-$3'
    );
  } else if (filteredInput.length > 3) {
    formattedInput = filteredInput.replace(/(\d{3})(\d{1,3})/, '$1-$2');
  } else {
    formattedInput = filteredInput;
  }

  target.value = formattedInput;

  // Update the correct formState entry
  for (const key in formState) {
    if (formState[key].type === 'tel') {
      formState[key].value = formattedInput;
      break;
    }
  }
};

// Form validation
const validateForm = () => {
  errorEmail.value = false;
  errorPhone.value = false;

  for (const key in formState) {
    if (formState.hasOwnProperty(key)) {
      const item = formState[key];
      const formField = props.block.list_fields?.[Number(key)];

      if (formField?.status_error) {
        if (item.type === 'file') {
          // Handle file validation
          if (
            !item.value ||
            (Array.isArray(item.value) && item.value.length === 0)
          ) {
            fieldError[key] = true;
          } else {
            fieldError[key] = false;
          }
          continue;
        }

        if (
          typeof item.value !== 'object' &&
          (!item.value || !item.value.trim())
        ) {
          fieldError[key] = true;
        } else {
          if (item.type === 'tel' && !telRegex.test(item.value.trim())) {
            fieldError[key] = false;
            errorPhone.value = true;
          } else if (
            item.type === 'email' &&
            !emailRegex.test(item.value.trim())
          ) {
            fieldError[key] = false;
            errorEmail.value = true;
          } else {
            fieldError[key] = false;
          }
        }
      }
    }
  }

  return (
    !Object.values(fieldError).some((error) => error) &&
    !errorEmail.value &&
    !errorPhone.value
  );
};

// Clear form data
const clearFormData = () => {
  for (const key in formState) {
    if (formState.hasOwnProperty(key)) {
      formState[key] = {
        ...formState[key],
        value: '',
      };
    }
  }

  // Clear file data
  for (const key in listFilesComplete) {
    delete listFilesComplete[key];
  }

  errorEmail.value = false;
  errorPhone.value = false;
};

// Upload file function with progress tracking
function uploadFile(formData: FormData, key: number) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        percentCompleteUploadFile[key] = {
          value: Math.round((event.loaded / event.total) * 100),
        };
      }
    };

    xhr.onload = function () {
      const response = xhr.response;
      if (xhr.status === 200) {
        statusUploadFile[key] = {
          value: response.status,
        };
        const listUrl = getListUrlFromResponseFile(xhr.response.data.result);
        updateFilesComplete(xhr.response.data.result, key);
        updateFormStateForFile(listUrl, key);
        delete listFilesUpload[key];
        resolve(true);
      } else {
        statusUploadFile[key] = {
          value: response.status,
        };
        showPopup(
          'Error',
          'Only files with these MIME types are allowed: image/*, application/pdf.',
          'error',
          true
        );
        reject(new Error('Upload failed'));
      }
    };

    xhr.onerror = function () {
      statusUploadFile[key] = {
        value: false,
      };
      showPopup(
        'Error',
        'An error occurred during file upload. Please check the file format or size and try again.',
        'error',
        true
      );
      reject(new Error('Upload failed'));
    };

    xhr.open('POST', `${BASE_URL}/api/v1/end-user/storage/upload`);
    xhr.send(formData);
  });
}

// Form submission
const onSubmit = async () => {
  if (tenantId.value === '' && formToken.value === '') {
    showPopup(
      'Error',
      'Tenant ID is not found',
      'error',
      true
    );
    return;
  }
  try {
    isLoadingButton.value = true;

    if (!validateForm()) {
      showPopup(
        'Error',
        'Please fill all required fields correctly',
        'error',
        true
      );
      return;
    }

    const data_submission: any[] = [];

    for (const key in formState) {
      if (formState.hasOwnProperty(key)) {
        const item = formState[key];
        const formField = props.block.list_fields?.[Number(key)];

        if (formField) {
          if (Array.isArray(item.value)) {
            // Handle file arrays
            data_submission.push({
              name: formField.label,
              type: item.type,
              value: item.value,
            });
          } else if (item.value || item.value === '') {
            // Handle text values
            data_submission.push({
              name: formField.label,
              type: item.type,
              value: item.value,
            });
          }
        }
      }
    }

    const body = {
      form_name: props.block.title_form || 'Contact Form',
      tenant_id: tenantId.value,
      form_token: formToken.value,
      data_submission: data_submission,
    };

    await $fetch(`${BASE_URL}/api/v1/form-submission`, {
      method: 'POST',
      body: {
        ...body,
      },
    });

    // Clear form on success
    clearFormData();
    showPopup(
      'Success',
      'Your message has been sent successfully!',
      'success',
      true
    );
  } catch (error) {
    console.error('Form submission error:', error);
    showPopup(
      'Error',
      'Failed to send your message. Please try again.',
      'error',
      true
    );
  } finally {
    isLoadingButton.value = false;
  }
};

// Close notification popup
const closePopup = () => {
  showNotification.value = false;
  if (popupTimeout) {
    clearTimeout(popupTimeout);
    popupTimeout = null;
  }
};

// Initialize form state when component loads or form structure changes
watch(
  () => props.block.list_fields,
  () => {
    convertFormState();
  },
  { deep: true, immediate: true }
);
</script>
<style lang="scss" scoped>
/* Popup notification */
.popup-notification {
  display: none;
  z-index: 999999;
  visibility: visible;
  position: fixed;
  top: 10px;
  right: 10px;
  box-shadow: 1px 2px 3px #ccc;
  border-radius: 3px;
  background-color: #ffffff;
  transition: all 300ms linear 0ms;
}

.popup-notification.active {
  display: block;
  width: 300px;
  text-align: left;
}

.popup-content h2 {
  font-size: 18px !important;
  text-align: left !important;
}

.popup-content p {
  font-size: 14px !important;
  text-align: left !important;
}

.title_contact{
  font-size:26px;
  color: #7BB303;

}
</style>
