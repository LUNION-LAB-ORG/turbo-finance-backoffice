import { useQueryClient } from '@tanstack/react-query';

// 1- Clé de cache
export const depenseKeyQuery = (...params: any[]) => {
    if (params.length === 0) {
        return ['depense'];
    }
    return ['depense', ...params];
};

// 2. Créez un hook personnalisé pour l'invalidation
export const useInvalidateDepenseQuery = () => {
    const queryClient = useQueryClient();

    return async (...params: any[]) => {
        await queryClient.invalidateQueries({
            queryKey: depenseKeyQuery(...params),
            exact: false
        });

        await queryClient.refetchQueries({
            queryKey: depenseKeyQuery(),
            type: 'active'
        });
    };
};