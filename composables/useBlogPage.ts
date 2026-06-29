export async function useFetchBlogContent () {
  const languageStore = useLanguageStore();
  
  const pathQuery = computed(() => languageStore.getLocalizedUrl('/'));
  
  const { data: contentBlog, refresh: refreshBlogContent } = await useAsyncData(`contentBlog-${languageStore.keyLangCurrent}`, () =>
    queryContent(`${pathQuery.value}blog`)
      .where({ _path: { $eq: `${pathQuery.value}blog` } })
      .findOne()
  );

  return { contentBlog, refreshBlogContent };
}

export function useBlogPageHelpers () {
  const renderDateMonth = (fullDate: string) => {
    const newDate = new Date(fullDate);
    const date = newDate.getDate();
    const month = newDate.toLocaleString('default', { month: 'short' });
    return { date, month };
  };

  const formatDateTime = (fullDate: string) => {
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const newDate = new Date(fullDate);
    const date = newDate.getDate();
    const year = newDate.getFullYear();
    const day = weekday[newDate.getDay()];
    const month = newDate.toLocaleString('default', { month: 'short' });
    const time = newDate.getHours().toString().padStart(2, '0');
    const minute = newDate.getMinutes().toString().padStart(2, '0');
    const formatDate = `${day},  ${month} ${date}, ${year} ${time}:${minute}`
    return formatDate;
  };

  const convertToSlug = (str: string) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  };

  const renderDatePost = (fullDate: string) => {
    const dateInitial = new Date(fullDate);
    const dateFinal = new Date();
    const dateDifferenceInSeconds = (dateInitial: any, dateFinal: any) =>
      (dateFinal - dateInitial) / 1000;

    const dateDifferenceInMinutes = (dateInitial: any, dateFinal: any) =>
      (dateFinal - dateInitial) / (1000 * 60);

    const dateDifferenceInHours = (dateInitial: any, dateFinal: any) =>
      (dateFinal - dateInitial) / (1000 * 60 * 60);

    const dateDifferenceInDays = (dateInitial: any, dateFinal: any) =>
      (dateFinal - dateInitial) / (1000 * 60 * 60 * 24);

    const differenceInSeconds = dateDifferenceInSeconds(dateInitial, dateFinal);
    let result;
    let differenceInMinutes;
    let differenceInHours;
    let differenceInDays;
    switch (true) {
      case differenceInSeconds < 60:
        result = 'Just now';
        break;
      case differenceInSeconds < 3600:
        differenceInMinutes = dateDifferenceInMinutes(dateInitial, dateFinal);
        result = `${Math.floor(differenceInMinutes)} minutes ago`;
        break;
      case differenceInSeconds < 86400:
        differenceInHours = dateDifferenceInHours(dateInitial, dateFinal);
        result = `${Math.floor(differenceInHours)} hours ago`;
        break;
      case differenceInSeconds < 86400 * 4:
        differenceInDays = dateDifferenceInDays(dateInitial, dateFinal);
        result = `${Math.floor(differenceInDays)} days ago`;
        break;
      default:
        result = formatDateTime(fullDate);
        break;
    }
    return result
  };

  function convertToCapitalized (str: string) {
    if (!str) {
      return '';
    } else {
      return (
        str.charAt(0).toUpperCase().trimEnd() +
        str.slice(1).toLowerCase().trimEnd()
      );
    }
  }

  const renderCateOrTag = (post: any, key: string) => {
    const languageStore = useLanguageStore();
    const pathQuery = languageStore.getLocalizedUrl('/');
    const object: any[] = [];
    if (key in post && Array.isArray(post[key]) && post[key].length > 0) {
      post[key].forEach((item: any, index: any) => {
        if (typeof item.text === 'string') {
          object.push({
            text: index !== post[key].length - 1 ? `${convertToCapitalized(item.text)}` : convertToCapitalized(item.text),
            _path: `${pathQuery}blog/${key}/${convertToSlug(item.text)}`,
            open_new_tab: item?.open_new_tab
          });
        }
      });
    }
    const dataRemoveDuplicate = object.filter((value, index, self) => {
      return index === self.findIndex((v: any) => v.text === value.text);
    });

    return dataRemoveDuplicate;
  };

  return { renderDateMonth, renderCateOrTag, renderDatePost, formatDateTime, convertToSlug };
}
