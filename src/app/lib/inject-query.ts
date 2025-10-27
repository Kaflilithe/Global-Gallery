import { computed, inject, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { z, ZodObject } from 'zod';

export const injectQuery = <T extends ZodObject>(schema: T) => {
  const router = inject(Router);
  const route = inject(ActivatedRoute);

  const queryParams = toSignal(route.queryParams);
  const validQuery: Signal<z.infer<T>> = computed(() =>
    schema.parse(queryParams()),
  );

  const update = (params: Partial<z.infer<T>>) => {
    router.navigate([], {
      relativeTo: route,
      queryParams: { ...validQuery(), ...params },
    });
  };

  return {
    value: validQuery,
    update,
  };
};
