import type { NextApiRequest, NextApiResponse } from 'next';

import { Category, DefaultResponseData } from '@types';
import router from '../../../../lib/routing/router';
import { CategoryModel } from '@models';
import { CategoriesResources } from '@resources';

interface Data extends DefaultResponseData {
  categories: Category[];
}

router.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const categories: any[] = CategoriesResources.many(
    await CategoryModel.findByAnimeId(+id)
  );

  res.send({ success: true, categories, params: req.query });
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
