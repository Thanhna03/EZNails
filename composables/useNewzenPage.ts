import NewzenConnector from 'newzen-connector';
import 'newzen-connector/dist/style.css';

export function useNewzenPage(pageData:any) {
  const route = useRoute();

  if (!pageData) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
      fatal: true,
    });
  }

  const head = generateHead(pageData, route);

  useHead(head);

  const formattedPage = ref(pageData?.content_blocks ? NewzenConnector.formatContentBlock(pageData) : {});

  const newzenCallback = (_formattedPage: any) => {
    formattedPage.value = _formattedPage;
  };

  const connector = new NewzenConnector({
    initialData: formattedPage.value,
    callback: newzenCallback,
  });

  onMounted(() => {
    connector.actionHandler();
  });


  return { formattedPage };
}